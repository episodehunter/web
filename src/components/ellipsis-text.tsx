import * as React from 'react'
import { P } from './text'

type Props = { children: string; length: number; style?: any }
type State = { showAllText: boolean }

export class EllipsisText extends React.Component<Props, State> {
  state = {
    showAllText: false
  }

  showAllText = () => this.setState({ showAllText: true })

  render() {
    if (!this.props.children) {
      return null
    }
    const textLength = this.props.children.length
    if (this.state.showAllText || textLength < this.props.length) {
      return <P style={this.props.style}>{this.props.children}</P>
    }
    return (
      <P
        style={{ ...this.props.style, cursor: 'pointer' }}
        onClick={this.showAllText}
      >
        {this.props.children.substr(0, this.props.length)}...
      </P>
    )
  }
}
