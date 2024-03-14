import { Widget, useAccount } from "near-social-vm";
import React, { useState } from "react";
import {
  NavLink,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { LogOut } from "./icons/LogOut";
import { Pretend } from "./icons/Pretend";
import { StopPretending } from "./icons/StopPretending";
import { User } from "./icons/User";
import PretendModal from "./PretendModal";

const CoreBackdrop = styled.div`
  position: fixed;
  left: 0;
  bottom: 10px;
  width: 60px;
  height: auto;
  display: flex;
  z-index: 50;
`;

const CoreBox = styled.div`
  background: white;
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.3);
  z-index: 1002;

  &:hover {
    box-shadow: 0px 8px 3px rgba(0, 0, 0, 0.2);
    transform: scale(0.98) translateY(3px);
  }

  &:active {
    box-shadow: 0px 5px 2px rgba(0, 0, 0, 0.2);
    transform: scale(0.96) translateY(6px);
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

const StyledDropdown = styled.div`
  .dropdown-toggle {
    display: flex;

    &:after {
      border-top-color: var(--slate-dark-11);
    }

    img {
      border-radius: 50% !important;
    }

    .profile-info {
      margin: 5px 10px;
      line-height: normal;
      max-width: 140px;

      .profile-name,
      .profile-username {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .profile-name {
        color: black;
      }
      .profile-username {
        color: var(--slate-dark-11);
      }
    }
  }

  ul {
    width: 100%;

    li {
      padding: 0 6px;
    }

    button,
    a {
      font-weight: var(--font-weight-medium);
      text-transform: lowercase !important;
      display: inline-block;
      text-align: center;
      text-decoration: none;
      border: 2px outset #333;
      background-color: #f5f5f5;
      cursor: pointer;
      color: #333;
      padding: 12px;

      &:active {
        border-style: inset;
        background-color: #d5d5d5;
        color: #000;
      }

      &:hover {
        background-color: #e5e5e5;
        color: #111;
      }

      svg {
        margin-right: 7px;
        min-width: 24px;
        path {
          stroke: var(--slate-dark-9);
        }
      }
    }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const ArrowButton = styled.button`
  flex-grow: 1;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  text-transform: lowercase !important;
  height: 48px;
  width: 48px;
  text-align: center;
  text-decoration: none;
  border: 2px outset #333;
  cursor: pointer;
  color: #333;
  padding: 20px 20px;
  margin: 4px;

  &:active {
    border-style: inset;
    color: #000;
  }

  &:hover {
    color: #111;
  }
`;

const Core = (props) => {
  const account = useAccount();
  const location = useLocation();

  const [showPretendModal, setShowPretendModal] = useState(false);

  return (
    <CoreBackdrop className="core__auth">
      <CoreBox className="classic">
        <StyledDropdown className="dropdown">
          {props.signedIn ? (
            <div
              type="button"
              id="dropdownMenu2222"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Widget
                src={"mob.near/widget/ProfileImage"}
                props={{
                  accountId: account.accountId,
                  className: "d-inline-block m-2",
                  imageClassName: "rounded-circle w-100 h-100",
                  style: { width: "42px", height: "42px" },
                }}
              />
            </div>
          ) : (
            <Button
              onClick={props.requestSignIn}
              style={{ width: "48px", padding: 0 }}
            >
              <i className="bi bi-key-fill" />
              {/* <i className="bi bi-brush" /> */}
              {/* <i className="bi bi-brush-fill" /> */}
              {/* <i className="bi bi-hammer" /> */}
              {/* <i className="bi bi-pen" /> */}
              {/* <i className="bi bi-vector-pen" /> */}
            </Button>
          )}
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenu2222"
            style={{ minWidth: "fit-content" }}
          >
            <li>
              <a
                className="dropdown-item"
                style={{ maxWidth: "300px" }}
                type="button"
                href={`https://${account.accountId}.social`}
              >
                <Widget
                  src={"mob.near/widget/Profile.InlineBlock"}
                  props={{
                    accountId: account.accountId,
                  }}
                />
              </a>
            </li>
            <li>
              <NavLink
                className="dropdown-item"
                type="button"
                to={`/${account.accountId}`}
              >
                <User />
                my everything
              </NavLink>
            </li>
            {account.pretendAccountId ? (
              <li>
                <button
                  className="dropdown-item"
                  disabled={!account.startPretending}
                  onClick={() => account.startPretending(undefined)}
                >
                  <StopPretending />
                  Stop pretending
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setShowPretendModal(true)}
                >
                  <Pretend />
                  Pretend to be another account
                </button>
              </li>
            )}
            <li>
              <button className="dropdown-item" onClick={() => props.logOut()}>
                <LogOut />
                Sign Out
              </button>
            </li>
            <li>
              <ButtonRow>
                <ArrowButton>
                  <i className="bi bi-arrow-left"></i>
                </ArrowButton>
                <NavLink type="button" to={"/"}>
                  <i className="bi bi-house"></i>
                </NavLink>
                <ArrowButton>
                  <i className="bi bi-arrow-right"></i>
                </ArrowButton>
              </ButtonRow>
            </li>
          </ul>
        </StyledDropdown>
        <PretendModal
          show={showPretendModal}
          onHide={() => setShowPretendModal(false)}
          widgets={props.widgets}
        />
      </CoreBox>
    </CoreBackdrop>
  );
};

export default Core;
