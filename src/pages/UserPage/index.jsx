import { Divider, Tag } from "antd";
import React from "react";
import { Route, Link } from "react-router-dom";
import { menus } from "components/Common/MenuUser";
import ChargeInBankAccount from "./ChargeInBankAccountPage";
import HistoryOrderPage from "./HistoryOrderPage";
import HistoryPurchasedPage from "./HistoryPurchasedPage";
import PurchasedOneDayPage from "./PurchasedOneDayPage";
import HistoryAdvanceMoneyPage from "./HistoryAdvanceMoneyPage";
import StockPage from "./StockPage";

import "./user.css";

import { Layout, Menu } from "antd";
import { List } from "antd";
const { Content, Sider } = Layout;

function UserPage(props) {
  const MenuLink = ({ label, to, activeOnLyWhenExact }) => {
    return (
      <Route
        path={to}
        exact={activeOnLyWhenExact}
        children={({ match }) => {
          let active = match ? "user__active--link" : "";
          let active__text = match ? "text--user__link" : "";
          return (
            <List.Item className={`list--user ${active}`}>
              <List.Item.Meta
                className={`item--user ${active__text}`}
                title={
                  <Link to={to}>
                    <span
                      className={`text--user ${active__text}`}
                      style={{
                        fontWeight: 300,
                        fontSize: "16px",
                      }}
                    >
                      {label}
                    </span>
                  </Link>
                }
              />
            </List.Item>
          );
        }}
      ></Route>
    );
  };
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* <Header /> */}
      <Layout
        style={{
          marginTop: "39px",
        }}
      >
        <Layout style={{}}>
          <Sider width={200} className="site-layout-background">
            <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
              <List
                className="header__list--menu"
                header="DANH MỤC"
                style={{ textAlign: "center" }}
                itemLayout="horizontal"
                dataSource={menus}
                renderItem={(item) => (
                  <MenuLink
                    to={item.to}
                    activeOnLyWhenExact={true}
                    label={item.label}
                  ></MenuLink>
                )}
              />
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <main className="main-user">
                <div className="container content-wp">
                  <div className="row">
                    <div className="col col-12">
                      <Divider orientation="left">
                        {" "}
                        <Tag style={{ fontSize: "1rem" }} color="volcano">
                          Họ và tên: {user.ho} {user.ten} <br /> Mã NDT:{" "}
                          {user.maNdt}
                        </Tag>{" "}
                      </Divider>
                      <>
                        <Route
                          exact
                          path="/khach-hang/lich-su-dat-lenh"
                          component={HistoryPurchasedPage}
                        />
                        <Route
                          exact
                          path="/khach-hang/chung-khoan-hien-co"
                          component={StockPage}
                        />
                        <Route
                          exact
                          path="/khach-hang/lich-su-khop-lenh"
                          component={HistoryOrderPage}
                        />
                        <Route
                          exact
                          path="/khach-hang/so-du-tien-ngan-hang"
                          component={ChargeInBankAccount}
                        />
                        <Route
                          exact
                          path="/khach-hang/lenh-trong-ngay"
                          component={PurchasedOneDayPage}
                        />
                        <Route
                          exact
                          path="/khach-hang/lenh-ung"
                          component={HistoryAdvanceMoneyPage}
                        />
                      </>
                    </div>
                  </div>
                </div>
              </main>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      ,{/* <Footer /> */}
    </>
  );
}

export default UserPage;
