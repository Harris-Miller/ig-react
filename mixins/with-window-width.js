import { Dimensions } from 'react-native';

export default function withWindowWidth(target) {
  return class extends target {
    componentDidMount() {
      super.componentDidMount && super.componentDidMount();
      this.updateWindowWidth();
      Dimensions.addEventListener('change', this.updateWindowWidth);
    }

    componentWillUnmount() {
      super.componentWillUnmount && super.componentWillUnmount();
      Dimensions.removeEventListener('change', this.updateWindowWidth);
    }

    updateWindowWidth = () => {
      this.setState({ windowWidth: Dimensions.get('window').width });
    };
  }
}
