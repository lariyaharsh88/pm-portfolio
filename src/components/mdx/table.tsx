import { Children, cloneElement, isValidElement, type ComponentProps, type CSSProperties, type ReactElement, type ReactNode } from "react"

type Align = "left" | "center" | "right"
type WithChildren = ReactElement<{ children?: ReactNode }>

const elements = (node: ReactNode) => Children.toArray(node).filter(isValidElement) as WithChildren[]
const textOf = (node: ReactNode): string =>
  typeof node === "string" || typeof node === "number"
    ? String(node)
    : Array.isArray(node)
      ? node.map(textOf).join("")
      : isValidElement(node)
        ? textOf((node.props as { children?: ReactNode }).children)
        : ""

/**
 * On phones each row becomes a card and the header row is hidden, so with three or more columns the values lose
 * their meaning. Copy each header onto its cells as data-label; the stacked layout prints it before the value.
 */
function labelCells(children: ReactNode): ReactNode {
  const parts = elements(children)
  const head = parts.find((p) => p.type === "thead")
  const headers = head ? elements(elements(head.props.children)[0]?.props.children).map((th) => textOf(th.props.children)) : []
  if (headers.length < 3) return children
  return parts.map((part) =>
    part.type !== "tbody"
      ? part
      : cloneElement(
          part,
          {},
          elements(part.props.children).map((tr) =>
            cloneElement(tr, {}, elements(tr.props.children).map((td, i) => cloneElement(td as ReactElement<Record<string, unknown>>, { "data-label": headers[i] }))),
          ),
        ),
  )
}

function alignOf(value: unknown): Align | undefined {
  return value === "left" || value === "center" || value === "right" ? value : undefined
}

function cellAlign(align: unknown, style: CSSProperties | undefined): Align | undefined {
  return alignOf(align) ?? alignOf(style?.textAlign)
}

export function CaseTable({ children, ...props }: ComponentProps<"table">) {
  return (
    <div className="case-table-wrap not-prose">
      <table className="case-table" {...props}>
        {labelCells(children)}
      </table>
    </div>
  )
}

export function CaseTh({ align, style, className, children, ...props }: ComponentProps<"th">) {
  const side = cellAlign(align, style)
  return (
    <th
      {...props}
      align={side}
      style={style}
      className={side === "right" ? "is-numeric" : className}
    >
      {children}
    </th>
  )
}

export function CaseTd({ align, style, className, children, ...props }: ComponentProps<"td">) {
  const side = cellAlign(align, style)
  return (
    <td
      {...props}
      align={side}
      style={style}
      className={side === "right" ? "is-numeric" : className}
    >
      {children}
    </td>
  )
}
