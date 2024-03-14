import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Widget, useAccount } from "near-social-vm";

export default function PretendModal(props) {
  const account = useAccount();
  const onHide = props.onHide;
  const show = props.show;

  const [accountId, setAccountId] = useState("");

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Pretend to be another account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label htmlFor="widget-src-input" className="form-label">
            Pretend to be account ID:
          </label>
          <input
            className="form-control"
            id="widget-src-input"
            type="text"
            value={accountId}
            onChange={(e) =>
              setAccountId(
                e.target.value.toLowerCase().replaceAll(/[^a-z0-9_.\-]/g, "")
              )
            }
          />
        </div>
        <div className="mt-2">
          <Widget
            src={"mob.near/widget/Profile.InlineBlock"}
            props={{ accountId }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-success"
          disabled={!accountId || !account.startPretending}
          onClick={(e) => {
            e.preventDefault();
            account.startPretending(accountId);
            setAccountId("");
            onHide();
          }}
        >
          Pretend
        </button>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
