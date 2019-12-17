import Typography, { TypographyProps } from '@material-ui/core/Typography'
import React from 'react'

type TextComponents =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'

interface TextProps extends TypographyProps {
  variant?: TextComponents
  gutter?: boolean
  style?: React.CSSProperties
  children?: React.ReactNode
  className?: string
}

const createTextComponent = (
  defaultVariant: TextComponents,
  component: React.ElementType<React.HTMLAttributes<HTMLElement>>,
  defaultGutter: number
) => ({
  variant = defaultVariant,
  gutter = Boolean(defaultGutter),
  children,
  style,
  className,
  ...rest
}: TextProps) => {
  const margin = style?.margin || `${gutter ? defaultGutter : 0}px 0`
  const newStyle = { ...style, margin }
  return (
    <Typography
      variant={variant}
      component={component}
      style={newStyle}
      className={className}
      {...rest}
    >
      {children}
    </Typography>
  )
}

export const H1 = createTextComponent('h1', 'h1', 20)
export const H2 = createTextComponent('h2', 'h2', 20)
export const H3 = createTextComponent('h3', 'h3', 30)
export const H4 = createTextComponent('h4', 'h4', 0)
export const H5 = createTextComponent('h5', 'h5', 0)
export const Body1 = createTextComponent('body1', 'p', 0)
export const Body2 = createTextComponent('body2', 'p', 0)
export const Caption = createTextComponent('caption', 'p', 0)
export const Overline = createTextComponent('overline', 'p', 0)
export const Subtitle1 = createTextComponent('subtitle1', 'span', 0)
export const Subtitle2 = createTextComponent('subtitle2', 'span', 0)

export const PageTitle: React.FC = ({ children }) => {
  return <H2 style={{ fontSize: 32 }}>{children}</H2>
}
