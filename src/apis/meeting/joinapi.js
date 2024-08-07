import axios from "axios";

// 모임신청서 작성 (모임장)
export const postApplication = async (_partySeq, _data) => {
  try {
    const response = await axios.post(`/api/join/${_partySeq}`, _data);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
// 모임신청서 승인 (관리자)
export const patchApproval = async (_partySeq, _userSeq) => {
  try {
    const response = await axios.patch(
      `/api/party/authGb1?partySeq=${_partySeq}&userSeq=${_userSeq}`,
    );
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
// 관리자는 모임 전체 불러오기를 통해 승인

// 신청서 불러오기 (user)
export const getApplication = async (_partySeq, _leaderUserSeq) => {
  try {
    const response = await axios.get(
      `/api/join/${_partySeq}?leaderUserSeq=${_leaderUserSeq}`,
    );
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 모임 맴버 불러오기
export const getMemberList = async _partySeq => {
  try {
    const response = await axios.get(`/api/member/${_partySeq}`);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 신청승인 (모임장)
export const patchNewMember = async (_partySeq, _data) => {
  try {
    const response = await axios.patch(`/api/join/gb/${_partySeq}`, _data);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      // console.log("response", response.data);
      // return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
