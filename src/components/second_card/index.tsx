import { count } from "console";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { IProduct } from "models/IProduct";
import { FC, useEffect, useState } from "react";
import { contructorSlice } from "redux/product/reducer";
import styles from "./index.module.scss";

type IProps = {
  id: string
  name: string
  prize: number
  imgUrl: string
  count: number
};

const SecondCard: FC<IProps> = ({id, imgUrl,name,prize, count}) => {
  const dispatch = useAppDispatch();
  let [num, setNum] = useState(count);
  const { products, isChose, isInitial } = useAppSelector(
    (state) => state.contructorReducer
  );
  let incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
  };
  let decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  };

  useEffect(() => {
    let product:IProduct = {
      id,
      name,
      imgUrl,
      prize,
      count: num
    }
    if(num >= 0) {
      dispatch(contructorSlice.actions.setProduct(product))
    }
  }, [num]);

  console.log(products)
  return (
    <div key={id} className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src={imgUrl}
                alt={imgUrl}
              />
            </figure>
          </div>
          <div className="media-content">
          <p className="title is-4">{name}</p>
            <p className="title is-4">{prize} сом</p>
          </div>
        </div>

        <div className="content is-flex is-align-items-center" style={{gap: '30px'}}>
          <div className="is-flex is-align-items-center">
            <button onClick={() => decNum()} className="button">
              -
            </button>
            <div className="px-5">{num}</div>
            <button onClick={() => incNum()} className="button">
              +
            </button>
          </div>
          <button className="button is-danger" onClick={() => dispatch(contructorSlice.actions.removeItem(id))} >Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default SecondCard;
