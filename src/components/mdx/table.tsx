import type { ComponentProps, CSSProperties } from "react"

type Align = "left" | "center" | "right"

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
        {children}
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
