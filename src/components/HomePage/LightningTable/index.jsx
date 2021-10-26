import * as signalR from "@microsoft/signalr";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import callApi from "utils/apiCaller";
import * as actionList from "../../../actions/LightningTable/index";
import * as Config from "../../../constants/Config";
import * as Gia from "../../../constants/LightningTable/index";
import FormOrder from "../FormItem/FormOrder";
import LightningTableItem from "../LightningTableItem";
import Popup from "components/Popup";
import { Tabs } from "antd";
import { SaveTwoTone } from "@ant-design/icons";
const { TabPane } = Tabs;

function LightningTable(props) {
  const LightningTableList = useSelector((state) => state.LightningTableList);
  const LightningTableListLike = useSelector(
    (state) => state.LightningTableListLike
  );
  const [stocks, setStocks] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [macp, setMacp] = useState("");
  const [popup, setPopup] = useState({
    visible: false,
    value: null,
    x: 0,
    y: 0,
    liked: false,
  });

  const [key, setKey] = useState("1"); //1 là HRS , 2 YÊU THÍCH
  const token = useSelector((state => state.Token))
  const history = useHistory();
  const [isOpenFormOrder, setIsOpenFormOrder] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [filteredStocks, setFilteredStocks] = useState(LightningTableList);
  const User = useSelector((state) => state.User);
  const dispatch = useDispatch();

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(Config.BASE_URL + "/signalr")
      .configureLogging(signalR.LogLevel.Information)
      .build();
    hubConnection.on("message", (message) => {
      let json = JSON.parse(message);
      console.log(json);
      dispatch(actionList.FetchChangeListStocks(json));
    });
    hubConnection.start();
  }, []);

  useEffect(() => {
    dispatch(actionList.FetchListStocksRequest());
    dispatch(actionList.FetchListStocksRequestLike());
  }, []);

  useEffect(() => {
    setFilteredStocks(
      LightningTableList.filter((stock) =>
        stock.macp?.toLowerCase().includes(keyWord.toLowerCase())
      )
    );
  }, [keyWord, LightningTableList, isOpenFormOrder]);

  const onHandleOrder = (macp) => {
    if (User === null) history.replace("/login");
    else {
      callApi("TaiKhoanNganHang", "GET", null).then((res) => {
        setBankList(res.data);
        setIsOpenFormOrder(true);
        setMacp(macp);
      });
    }
  };

  let element =
    key === "1"
      ? filteredStocks.map((value, index) => {
          return (
            <LightningTableItem
              listLike={LightningTableListLike}
              isKey={key}
              setPopup={setPopup}
              key={index}
              macp={value.macp}
              giaTC={value.giaTC === null ? null : value.giaTC / Gia.GIA}
              giaTran={value.giaTran === null ? null : value.giaTran / Gia.GIA}
              giaSan={value.giaSan === null ? null : value.giaSan / Gia.GIA}
              ktTong={value.ktTong}
              giaMua3={value.giaMua3 === null ? null : value.giaMua3 / Gia.GIA}
              klMua3={value.klMua3}
              giaMua2={value.giaMua2 === null ? null : value.giaMua2 / Gia.GIA}
              klMua2={value.klMua2}
              giaMua1={value.giaMua1 === null ? null : value.giaMua1 / Gia.GIA}
              klMua1={value.klMua1}
              gia={value.gia === null ? null : value.gia / Gia.GIA}
              kl={value.kl}
              giaBan1={value.giaBan1 === null ? null : value.giaBan1 / Gia.GIA}
              klBan1={value.klBan1}
              giaBan2={value.giaBan2 === null ? null : value.giaBan2 / Gia.GIA}
              klBan2={value.klBan2}
              giaBan3={value.giaBan3 === null ? null : value.giaBan3 / Gia.GIA}
              klBan3={value.klBan3}
              onHandleOrder={onHandleOrder}
            />
          );
        })
      : filteredStocks
          .filter((value) => {
            if (LightningTableListLike.includes(value.macp)) {
              return value;
            }
          })
          .map((value, index) => {
            return (
              <LightningTableItem
                listLike={LightningTableListLike}
                isKey={key}
                setPopup={setPopup}
                key={index}
                macp={value.macp}
                giaTC={value.giaTC === null ? null : value.giaTC / Gia.GIA}
                giaTran={
                  value.giaTran === null ? null : value.giaTran / Gia.GIA
                }
                giaSan={value.giaSan === null ? null : value.giaSan / Gia.GIA}
                ktTong={value.ktTong}
                giaMua3={
                  value.giaMua3 === null ? null : value.giaMua3 / Gia.GIA
                }
                klMua3={value.klMua3}
                giaMua2={
                  value.giaMua2 === null ? null : value.giaMua2 / Gia.GIA
                }
                klMua2={value.klMua2}
                giaMua1={
                  value.giaMua1 === null ? null : value.giaMua1 / Gia.GIA
                }
                klMua1={value.klMua1}
                gia={value.gia === null ? null : value.gia / Gia.GIA}
                kl={value.kl}
                giaBan1={
                  value.giaBan1 === null ? null : value.giaBan1 / Gia.GIA
                }
                klBan1={value.klBan1}
                giaBan2={
                  value.giaBan2 === null ? null : value.giaBan2 / Gia.GIA
                }
                klBan2={value.klBan2}
                giaBan3={
                  value.giaBan3 === null ? null : value.giaBan3 / Gia.GIA
                }
                klBan3={value.klBan3}
                onHandleOrder={onHandleOrder}
              />
            );
          });

  const checkUser = async () => {
    if (User === null) history.replace("/login");
    else {
      callApi("TaiKhoanNganHang", "GET", null).then((res) => {
        setBankList(res.data);
        setIsOpenFormOrder(true);
      });
    }
  };

  const onClickKey = (e) => {
    setKey(e);
  };
  const onHanleLike = async () => {
    if (!LightningTableListLike.includes(popup.value)) {
      const res = await callApi("yeuthich", "post", {
          maCP : popup.value
      });
      if (res.status === 200) {
        dispatch(actionList.FetchListStocksRequest());
        dispatch(actionList.FetchListStocksRequestLike());
      }
      console.log("Yêu thích");
    } else {
      const res = await callApi(`yeuthich/${popup.value}`, "delete");
      if (res.status === 200) {
        dispatch(actionList.FetchListStocksRequest());
        dispatch(actionList.FetchListStocksRequestLike());
        console.log("Bỏ thích");
      }
    }
  };
  return (
    <>
      <main class="content-wp">
        <section
          className="content"
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <div className="content__search">
            <input
              type="text"
              placeholder="Nhập mã CK ..."
              className="content__search-input"
              name="keyWord"
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
              style={{ textTransform: "uppercase" }}
            />
            <i className="content__search-icon fas fa-search" />

            <div className="wp-list-stock">
              <ul className="list-stock">
                <li className="stock-item">
                  <span>
                    ABC <br /> <br /> Công ty Cổ phần Mĩ thuật và Truyền thông
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <Tabs defaultActiveKey={1} onChange={onClickKey}>
            <TabPane tab="Cổ phiếu sàn HRS" key={1}></TabPane>
           {token ?  <TabPane tab="Cổ phiếu bạn đã thích" key={2}></TabPane> : null }
          </Tabs>
        </section>
        <section className="table-light-wp">
          <table className="table-light__header">
            <thead className="table-light__header--fixed">
              <tr className="table-light__header-first">
                <th rowSpan={2}>CK</th>
                <th rowSpan={2}>Trần</th>
                <th rowSpan={2}>Sàn</th>
                <th rowSpan={2}>TC</th>
                <th rowSpan={1} colSpan={6}>
                  Bên mua
                </th>
                <th rowSpan={1} colSpan={2}>
                  Khớp lệnh
                </th>
                <th rowSpan={1} colSpan={6}>
                  Bên bán
                </th>
                <th rowSpan={2}>Tổng KL</th>
              </tr>
              <tr className="table-light__header-second">
                <th>Giá 3</th>
                <th>KL 3</th>
                <th>Giá 2</th>
                <th>KL 2</th>
                <th>Giá 1</th>
                <th>KL 1</th>
                <th>Giá</th>
                <th>KL</th>
                <th>Giá 1</th>
                <th>KL 1</th>
                <th>Giá 2</th>
                <th>KL 2</th>
                <th>Giá 3</th>
                <th>KL 3</th>
              </tr>
            </thead>
          </table>
          <table className="table-light__content" id="HCM">
            <tbody className="line-stocks">
              {" "}
              {/* 1 stock */}
              {element}
            </tbody>
          </table>
        </section>
      </main>
      <Button type="primary" className="btn-match" onChange={checkUser}>
        Đặt lệnh
      </Button>
      {isOpenFormOrder ? (
        <FormOrder
          isOpenFormOrder={isOpenFormOrder}
          setIsOpenFormOrder={setIsOpenFormOrder}
          bank_list={bankList}
          macp={macp}
          setMacp={setMacp}
        />
      ) : null}
      {
          token ?  <Popup {...popup} onClick={onHanleLike} /> : null
      }
     
    </>
  );
}
export default LightningTable;
