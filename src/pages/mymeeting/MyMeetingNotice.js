import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteNotice,
  getNoticeOne,
} from "../../apis/mymeetingapi/meetingnotice/meetingnotice";
import Loading from "../../components/common/Loading";
import { toast } from "react-toastify";
const MyMeetingNoticeStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .notice-wrap {
    width: 100%;
    margin-bottom: 75px;
    height: 650px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1024px;
    gap: 40px;
  }
  .notice-inner {
    width: 100%;
  }
  .notice-form-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    max-width: 900px;
    border: 1px solid gray;
    border-radius: 4px;
    box-shadow: 1px 1px 1px 1px gray;
  }
  .meeting-introduce {
    margin-top: 30px;
    display: flex;
    width: 100%;
    height: 205px;
    justify-content: center;
    align-items: center;
    gap: 63px;
  }
  /* 임시 */
  form {
    width: 90%;
  }
  .button-wrap {
    display: flex;
    justify-content: right;
    width: 100%;
    padding: 10px;
    gap: 20px;
  }
  .flex-column {
    width: 100%;
    text-align: left;
    padding: 20px 0;
  }
  .noitce-form-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .notice-textarea {
    resize: none;
    padding: 10px;
    line-height: 2;
    width: 100%;
  }
`;
const TitleDivStyle = styled.div`
  width: 100%;
  display: block;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding-left: 5px;
  padding-top: 20px;
`;
const MyMeetingNotice = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [textAreaVal, setTextAreaVal] = useState("");
  const [textAreaLength, setTextAreaLength] = useState(0);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState();
  const [previewPreImg, setPreviewPreImg] = useState();
  const location = useLocation();
  const param = useParams();
  const navigate = useNavigate();
  console.log(location);
  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await getNoticeOne(
        param.meetingnoticeId,
        location.state.boardPartySeq,
        location.state.boardMemberSeq,
      );
      setData(res);
      console.log(res);
      console.log(res?.pics.length);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, []);
  const handleFileChange = e => {
    // file 이라서 e.target.value 를 활용하지 않는다.
    // e.taret.files 는 배열이다.
    // e.target.files = [];

    const tempFile = e?.target.files[0];
    // 사용자가 이미지를 선택하면
    // 웹브라우저는 이미지를 캐시에 보관함.
    // 임시 공간에 저장한 이미지를 우리는 경로를 알아내야 한다.
    // 그때 웹브라우저 상의 임시 URL 을 알아내는 기능 제공한다.
    console.log(tempFile);
    if (tempFile) {
      const tempUrl = URL?.createObjectURL(tempFile);

      setPreviewPreImg(tempUrl);

      // 전송할 파일 변경(주의합니다. 파일을 넣어주세요.)
      setImgFile(tempFile);
    }
  };
  const handleDeleteClick = async () => {
    try {
      const objData = {
        boardPartySeq: Number(param.meetingnoticeId),
        boardSeq: location.state.boardPartySeq,
        boardMemberSeq: location.state.boardMemberSeq,
      };
      console.log(objData);
      // const a = 1;
      // if (a === 1) return;
      await deleteNotice(objData);
    } catch (error) {
      console.log(error);
    }
    toast.success("게시글이 삭제되었습니다.");
    navigate(`/mymeeting/mymeetingLeader/${location.state.boardPartySeq}`);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <MyMeetingNoticeStyle>
        <div className="notice-wrap">
          <TitleDivStyle>모임 게시판</TitleDivStyle>
          <div className="notice-inner">
            <div className="notice-form-area">
              <form>
                {/* <!-- 굳이 해당 모임 타고 들어왔는데 보여줄 필요가 있나 싶어서 뺌 --> */}
                <div className="meeting-introduce">
                  <div
                    style={{
                      width: "50%",
                      height: "250px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* data?.pics.length > 0 */}
                    <label htmlFor="fileId">
                      {previewPreImg ? (
                        // 나중에 pics 로 조건 쳐야함.
                        <img
                          style={{
                            cursor: "pointer",
                            width: "200px",
                            height: "200px",
                          }}
                          src={previewPreImg}
                        />
                      ) : (
                        <CiImageOff
                          style={{ cursor: "pointer", textAlign: "center" }}
                          className="caption-img"
                          size="200"
                        />
                      )}
                      <input
                        style={{ width: "0", height: "0" }}
                        type="file"
                        id="fileId"
                        onChange={e => {
                          handleFileChange(e);
                        }}
                      ></input>
                    </label>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          textAlign: "left",
                        }}
                      >
                        <label htmlFor="mettingname" style={{ width: "25%" }}>
                          제목
                        </label>
                        <input
                          id="mettingname"
                          value={data?.boardTitle}
                          style={{ width: "73%" }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          textAlign: "left",
                        }}
                      >
                        <label htmlFor="mettingname" style={{ width: "25%" }}>
                          작성자
                        </label>
                        <input
                          id="mettingname"
                          value={data?.userName}
                          style={{ width: "73%" }}
                          readOnly
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          textAlign: "left",
                        }}
                      >
                        <label htmlFor="mettingdata" style={{ width: "25%" }}>
                          모임날짜
                        </label>
                        <input
                          id="mettingdata"
                          value={data?.inputDt}
                          style={{ width: "73%" }}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="noitce-form-container">
                  <div className="flex-column">
                    <label
                      htmlFor="noticecontent"
                      style={{ paddingBottom: "30px", display: "block" }}
                    >
                      내용
                    </label>
                    <textarea
                      id="noticecontent"
                      className="notice-textarea"
                      rows="10"
                      value={data?.boardContents}
                      maxLength={300}
                      onChange={e => {
                        setTextAreaVal(e.target.value);
                        setTextAreaLength(e.target.value.length);
                      }}
                    ></textarea>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ display: "none" }}>
                        <strong style={{ color: "red" }}>*</strong>
                        제한 숫자{textAreaLength}/300
                      </span>
                    </div>
                  </div>
                  <div className="button-wrap">
                    <button
                      type="button"
                      className="resister-btn"
                      onClick={() => {
                        toast.warning("3차때 구현 예정입니다.");
                      }}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => {
                        const a = 1;
                        if (a === 1) {
                          toast.warning("3차때 구현 예정입니다.");
                          return;
                        }
                        handleDeleteClick();
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MyMeetingNoticeStyle>
    </>
  );
};

export default MyMeetingNotice;
