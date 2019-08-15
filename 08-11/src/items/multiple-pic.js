/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/**
 * @file 多图组件
 */
import Component from './component';

import style from '../styles/items/multiplepic.scss';

export default class MultiplePic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    const imageList = data.imageList.map((imageUrl) => {
      return `<img class="${style['multiple-image-list-img']}" src=${imageUrl} />`;
    }).join('');

    return `<div class="item ${style['multiple-image']}">
              <h3 class="${style['multiple-image-h3']}">
                  ${data.title}
              </h3>
              <div>
                  ${imageList}
              </div>
          </div>`;
  }
}
