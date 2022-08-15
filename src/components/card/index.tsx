import { count } from "console";
import { useAppDispatch } from "hooks/redux";
import { IProduct } from "models/IProduct";
import { FC, useEffect, useState } from "react";
import { contructorSlice } from "redux/product/reducer";
import styles from "./index.module.scss";

type IProps = {
  id: string;
  name: string;
  prize: number;
  imgUrl: string;
};

const Card: FC<IProps> = ({id, imgUrl,name,prize}) => {
  const dispatch = useAppDispatch();
  let [num, setNum] = useState(0);
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
  }, [num])
  

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

        <div className="content">
          <div className="is-flex is-align-items-center">
            <button onClick={() => decNum()} className="button">
              -
            </button>
            <div className="px-5">{num}</div>
            <button onClick={() => incNum()} className="button">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
