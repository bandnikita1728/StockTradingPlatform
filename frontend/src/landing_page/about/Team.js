import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">Builder</h1>
      </div>

      <div
        className="row p-3 text-muted mb-4"
        style={{ lineHeight: "1.8", fontSize: "1.1em" }}
      >
        <div className="col-4 p-3 text-center">
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#387ed1",
              color: "#fff",
              fontSize: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              fontWeight: "700",
            }}
          >
            NB
          </div>
          <h4 className="mt-4">Nikita Band</h4>
          <h6 style={{ color: "#387ed1" }}>Developer</h6>
          <p style={{ fontSize: "13px", color: "#888" }}>B.Tech ECE · IIITDM Jabalpur</p>
        </div>
        <div className="col-8 p-3" style={{ paddingTop: "40px" }}>
          <p>
            I built this entirely on my own — from the first <code>npx create-react-app</code> to
            configuring CloudFront in the AWS console. Every bug I hit, I debugged.
            Every feature I wanted, I figured out how to build.
          </p>
          <p>
            <strong>What I learned building this:</strong> React with hooks and routing,
            REST APIs with Express, MongoDB schemas and queries, JWT + bcrypt auth,
            Chart.js for data viz, and the full AWS deployment stack — S3, CloudFront,
            EC2, PM2.
          </p>
          <p>
            The hardest parts? CORS errors at 2am. Mixed content blocking HTTPS→HTTP
            calls. PM2 starting the wrong file. MongoDB Atlas refusing connections.
            All the stuff tutorials skip — I hit every single one.
          </p>
          <p style={{ fontStyle: "italic", color: "#555" }}>
            "I was curious, so I built it. That's the whole story."
          </p>
        </div>
      </div>

      <div className="row p-3 mb-4">
        <div className="col-12">
          <h5 className="mb-3" style={{ color: "#444" }}>Tech stack</h5>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {["React", "React Router", "Axios", "Chart.js", "Node.js", "Express", "MongoDB Atlas", "Mongoose", "bcryptjs", "JWT", "AWS S3", "CloudFront", "EC2", "PM2", "Bootstrap 5"].map(tech => (
              <span key={tech} style={{ padding: "4px 14px", borderRadius: "20px", background: "#f0f4ff", color: "#387ed1", fontSize: "13px", fontWeight: "500", border: "1px solid #c8d8f8" }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="row p-3 mt-2 border-top text-center text-muted">
        <p style={{ fontSize: "14px", paddingTop: "16px" }}>
          Built by <strong>Nikita Band</strong> &middot; IIITDM Jabalpur &middot; 2026
        </p>
      </div>
    </div>
  );
}

export default Team;
