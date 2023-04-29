import React from "react";

function Subbmission() {
  return (
    <div className="scroll-wrapper">
      <div className="section-padding">
        <div className="container">
          <div className="row justify-content-center align-items-center gy-4 gy-md-0 gx-md-5">
            <div className="col-md-6">
              <img src="./images/confirm-submission.svg" alt="" />
            </div>
            <div className="col-md-6">
              <h1 className="h2 font-primary mb-3">Confirm Submission.</h1>
              <p className="p-large">
                Thanks for taking the time to complete this form. Please enter
                your Phone Number below and we will be in contact within 24
                hours.
              </p>
              <form method="post" className="form">
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value=""
                  />
                </div>
                <div className="form-group">
                  <a
                    href="javascript:void(0)"
                    className="btn btn-primary-fill w-65"
                  >
                    Complete Submission
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subbmission;
