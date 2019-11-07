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
  gutterBottom?: boolean
  style?: React.CSSProperties
  children?: string | JSX.Element | (JSX.Element | string)[]
  className?: string
}

const createTextComponent = (
  defaultVariant: TextComponents,
  component: React.ElementType<React.HTMLAttributes<HTMLElement>>,
  defaultGutterBottom: boolean
) => ({
  variant = defaultVariant,
  gutterBottom = defaultGutterBottom,
  children,
  style,
  className,
  ...rest
}: TextProps) => {
  return (
    <Typography
      variant={variant}
      component={component}
      gutterBottom={gutterBottom}
      style={style}
      className={className}
      {...rest}
    >
      {children}
    </Typography>
  )
}

export const H1 = createTextComponent('h1', 'h1', true)
export const H2 = createTextComponent('h2', 'h2', true)
export const H3 = createTextComponent('h3', 'h3', false)
export const H4 = createTextComponent('h4', 'h4', false)
export const H5 = createTextComponent('h5', 'h5', false)
export const Body1 = createTextComponent('body1', 'p', false)
export const Body2 = createTextComponent('body2', 'p', false)
export const Caption = createTextComponent('caption', 'p', false)
export const Overline = createTextComponent('overline', 'p', false)
export const Subtitle1 = createTextComponent('subtitle1', 'p', false)
export const Subtitle2 = createTextComponent('subtitle2', 'p', false)
