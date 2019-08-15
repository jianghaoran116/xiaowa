/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/**
 * @file 单图组件
 */
import Component from './component';

import style from '../styles/items/singlepic.scss';

export default class singlePic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return `<div class="item ${style['single-pic']}">
              <div class="${style['single-pic-content']}">
                  <span>
                      ${data.title}
                  </span>
              </div>
              <img
                class="${style['single-pic-img']}"
                src="${data.imageList[0]}" />
            </div>`;
  }
}
