/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/**
 * @file 大的单图模块
 */
import Component from './component';

import style from '../styles/items/bigsinglepic.scss';

export default class BigSinglePic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return `<div class="item ${style['big-single-pic']}">
              <div class="${style['big-single-pic-content']}">
                  <span>
                      ${data.title}
                  </span>
              </div>
              <img
                class="${style['big-single-pic-img']}"
                src="${data.imageList[0]}" />
            </div>`;
  }
}
