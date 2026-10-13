import { slugify } from "@/lib/slug"

type MdNode = {
  type: string
  depth?: number
  value?: string
  name?: string | null
  attributes?: unknown[]
  children?: MdNode[]
  data?: {
    hProperties?: Record<string, string>
  }
}

function nodeText(node: MdNode): string {
  if (node.type === "text" || node.type === "inlineCode") return node.value ?? ""
  return (node.children ?? []).map(nodeText).join("")
}

function section(children: MdNode[]): MdNode {
  return {
    type: "mdxJsxFlowElement",
    name: "Section",
    attributes: [],
    children,
  }
}

function isMdxComment(node: MdNode): boolean {
  if (node.type !== "mdxFlowExpression" && node.type !== "mdxTextExpression") return false
  return /^\s*\/\*[\s\S]*\*\/\s*$/.test(node.value ?? "")
}

function stripComments(node: MdNode) {
  if (!node.children) return
  node.children = node.children.filter((child) => !isMdxComment(child))
  for (const child of node.children) stripComments(child)
}

export function remarkStripMdxComments() {
  return (tree: MdNode) => {
    stripComments(tree)
  }
}

export function remarkWrapSections() {
  return (tree: MdNode) => {
    if (!tree.children) return tree

    const next: MdNode[] = []
    let current: MdNode | null = null

    for (const node of tree.children) {
      if (node.type === "heading" && node.depth === 2) {
        const id = slugify(nodeText(node))
        node.data = {
          ...node.data,
          hProperties: { ...node.data?.hProperties, id },
        }
        current = section([node])
        next.push(current)
        continue
      }

      if (current?.children) current.children.push(node)
      else next.push(node)
    }

    tree.children = next
    return tree
  }
}
