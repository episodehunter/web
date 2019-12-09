import React, { ReactNode, FC, useState, useEffect, useRef } from 'react'
import MaterialButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { colors } from '../../utils/colors'

export type ButtonTypes = 'cta' | 'secondary' | 'tertiary' | 'outlined'
type ButtonSize = 'big' | 'small' | 'xsmall'

export interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown
  // If true, the button will be disabled. false by default
  disabled?: boolean
  // The size of the button. `small` by default
  size?: ButtonSize
  // Button type. `cta` by default
  type?: ButtonTypes
  // Override css
  className?: string | undefined
  // Element placed before the children.
  startIcon?: ReactNode
  /**
   * When true, the button shows a spinner instead of text.
   * onClick is also disabled when true
   */
  progress?: boolean
  actionType?: 'submit' | 'reset' | 'button'
}

export const Button: FC<ButtonProps> = props => {
  const classes = useStyles(props)
  const [buttonWidth, setButtonWidth] = useState<number | 'auto'>('auto')
  const [showSpinner, setShowSpinner] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  /**
   * Measure the button when `progress` state changes
   * to keep the size of the button when the text is
   * hidden and the icon is removed.
   */
  useEffect(() => {
    if (!buttonRef.current) {
      setShowSpinner(Boolean(props.progress))
    } else if (props.progress) {
      setButtonWidth(buttonRef.current.clientWidth)
      setShowSpinner(true)
    } else {
      setButtonWidth('auto')
      setShowSpinner(false)
    }
  }, [props.progress])
  const onClick: ButtonProps['onClick'] = e => {
    if (!props.progress && props.onClick) {
      props.onClick(e)
    }
  }
  return (
    <MaterialButton
      type={props.actionType}
      ref={buttonRef}
      onClick={onClick}
      className={`${classes.root} ${props.className}`}
      style={{ width: buttonWidth }}
      disabled={props.disabled}
      variant={getVariant(props)}
      startIcon={!showSpinner && props.startIcon}
      TouchRippleProps={{
        classes: {
          child: classes.rippleEffect,
          rippleVisible: classes.rippleVisible
        }
      }}
      data-testid={props['data-testid']}
    >
      {showSpinner ? (
        <CircularProgress
          style={{ position: 'absolute' }}
          size={getProgressSize(props)}
          color="inherit"
        />
      ) : (
        props.children
      )}
    </MaterialButton>
  )
}

const getProgressSize = (p: ButtonProps) => {
  return p.size === 'big' ? '21px' : '19px'
}

const getVariant = (p: ButtonProps): 'text' | 'outlined' | 'contained' => {
  switch (p.type) {
    case 'tertiary':
      return 'text'
    case 'outlined':
      return 'outlined'
    default:
      return 'contained'
  }
}

const getColor = (p: ButtonProps): { bg: string; hover: string } => {
  switch (p.type) {
    case 'tertiary':
    case 'outlined':
      return {
        bg: 'rgba(0, 0, 0, 0)',
        hover: colors.neutral.blackish
      }
    case 'secondary':
      return {
        bg: colors.palette.secondary[500],
        hover: colors.palette.secondary[300]
      }
    default:
      return {
        bg: colors.palette.primary[500],
        hover: colors.palette.primary[300]
      }
  }
}

const textDecoration = (p: ButtonProps) => (p.type === 'tertiary' ? 'underline' : 'none')
const fontSize = {
  big: '16px',
  small: '14px',
  xsmall: '12px'
}
const lineHeight = {
  big: '20px',
  small: '18px',
  xsmall: '16px'
}
const minWidth = {
  big: '266px',
  small: '120px',
  xsmall: '50px'
}
const minHeight = {
  big: '52px',
  small: '46px',
  xsmall: '30px'
}
const padding = {
  big: '16px 32px',
  small: '12px 24px',
  xsmall: '8px 16px'
}
const size = (obj: { [k in ButtonSize]: string }) => ({ size = 'small' }: ButtonProps) => obj[size]

const useStyles = makeStyles({
  root: {
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: (p: ButtonProps) => getColor(p).hover,
      textDecoration
    },
    backgroundColor: (p: ButtonProps) => getColor(p).bg,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'none',
    textDecoration,
    fontSize: size(fontSize),
    lineHeight: size(lineHeight),
    letterSpacing: '0.5px',
    minWidth: size(minWidth),
    minHeight: size(minHeight),
    boxShadow: 'none',
    borderRadius: '100px',
    padding: size(padding)
  },
  rippleEffect: {
    backgroundColor: 'white'
  },
  rippleVisible: {
    opacity: 0.3,
    animation: '$KeyframeRippleEffect 550ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'scale(1)'
  },
  '@keyframes KeyframeRippleEffect': {
    '0%': {
      transform: 'scale(0)',
      opacity: 0.3
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 0.9
    }
  }
})
