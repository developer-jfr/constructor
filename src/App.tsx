import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import data from "data/items.json";
import Card from "components/card";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { contructorSlice } from "redux/product/reducer";
import { useState } from "react";
import SecondCard from "components/second_card";

function MainModule() {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { products, isChose, isInitial } = useAppSelector(
    (state) => state.contructorReducer
  );
  return (
    <>
      <div>
        <div className="is-flex">
          <button className="button" onClick={() => dispatch(contructorSlice.actions.setIsInitial(true))} >
            Step 1
          </button>
          <button  className="button" disabled={!isInitial ? false : true} onClick={() => dispatch(contructorSlice.actions.setIsInitial(false))}>
            Step 2
          </button>
        </div>

        {isInitial  ? (
          <>
          <div>
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Find a repository"
                />
              </div>
              <div className="control">
                <a className="button is-info">Search</a>
              </div>
            </div>
            <div className="is-flex" style={{ gap: "20px" }}>
              {data.map((item) => (
                <Card
                  id={item.id.toString()}
                  imgUrl={item.imgUrl}
                  name={item.name}
                  prize={item.price}
                />
              ))}
            </div>
          </div>
                <footer className="footer">
                <div
                  className="is-flex is-align-items-center is-justify-content-center"
                  style={{ gap: "50px" }}
                >
                  <strong>Вся сумма:</strong>
                  {products.reduce(
                    (number, item) => number + item.count * item.prize,
                    0
                  )}{" "}
                  сом
                  {products.reduce(
                    (number, item) => number + item.count * item.prize,
                    0
                  ) !== 0 && (
                    <div className="content has-text-centered">
                      <button
                        onClick={() => {
                          setSelectedTab(1);
                          dispatch(contructorSlice.actions.setIsInitial(false));
                        }}
                        className="button is-primary"
                      >
                        Далее
                      </button>
                    </div>
                  )}
                </div>
              </footer>
              </>
        ) : (
          <div>
            {products
              .filter((el) => el.count !== 0)
              .map((item, key) => (
                <SecondCard
                  count={item.count}
                  id={item.id}
                  imgUrl={item.imgUrl}
                  name={item.name}
                  prize={item.prize}
                />
              ))}
          </div>
        )}
      </div>


    </>
  );
}

export default MainModule;
