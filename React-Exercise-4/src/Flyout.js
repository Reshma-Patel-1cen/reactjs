import { useRef } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Tags from "./Tags";

const Flyout = ({ isPaneOpen, paneData, handleFlyoutCloseBtn, handleList }) => {

  const tagRef = useRef(null);

  const handleUpdate = () => {
    const tagData = tagRef.current.tags.map(x => x.label).join();
    handleList({ tags: tagData })
  }

  return (
    <div>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={isPaneOpen}
        title="User Details"
        // subtitle="Optional subtitle."
        width="500px"
        onRequestClose={handleFlyoutCloseBtn}
      >
        <div>
          <table className="table">
            <tbody>
              <tr><td><b>First Name:</b></td><td>{paneData.firstname}</td></tr>
              <tr><td><b>Last Name:</b></td><td> {paneData.lastname}</td></tr>
              <tr><td><b>Email:</b> </td><td>{paneData.email}</td></tr>
              <tr><td><b>Gender:</b> </td><td>{paneData.gender}</td></tr>
              <tr><td><b>Date of Birth:</b> </td><td>{paneData.dob}</td></tr>
            </tbody>
          </table>
          <div className="mb-2"><b>Tags</b></div>
          <Tags value={paneData.tags} ref={tagRef} />
          <button className='btn btn-primary mt-3' onClick={handleUpdate}>Update</button>
        </div>
        <br />
      </SlidingPane >
    </div >
  );
}

export default Flyout