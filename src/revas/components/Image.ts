import * as React from 'react'
import * as imageLoader from './common/imageLoader'
import drawImage from './common/drawImage'
import { NodeProps } from '../core/Node'

export type ImageViewProps = {
  src: string
} & NodeProps

export default class ImageView extends React.Component<ImageViewProps> {
  state = {
    ready: false
  }
  componentDidMount() {
    if (this.props.src) {
      imageLoader.get(this.props.src, this.onReady)
    }
  }
  componentDidUpdate(prev: any) {
    if (prev.src !== this.props.src) {
      if (prev.src)
        imageLoader.remove(prev.src, this.onReady)
      if (this.props.src)
        imageLoader.get(this.props.src, this.onReady)
    }
  }
  componentWillUnmount() {
    if (this.props.src)
      imageLoader.remove(this.props.src, this.onReady)
  }
  onReady = () => {
    this.setState({ ready: true })
  }
  render() {
    return React.createElement('Image', {
      customDrawer: this.state.ready ? drawImage : void 0,
      ...this.props
    })
  }
}
