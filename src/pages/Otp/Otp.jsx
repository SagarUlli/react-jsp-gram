import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOtp, resendOtp } from "../../services/userService";

function Otp() {
  const { userId } = useParams();

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [timer, setTimer] = useState(60);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await verifyOtp({
        userId: Number(userId),

        otp: Number(otp),
      });

      if (response.data.success) {
        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await resendOtp(Number(userId));

      if (response.data.success) {
        toast.success(response.data.message);

        setTimer(60);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: "450px" }}>
        <h2 className="text-center mb-4">Verify OTP</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-3">
          {timer > 0 ? (
            <small>Resend OTP in {timer}s</small>
          ) : (
            <button className="btn btn-link" onClick={handleResend}>
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Otp;
