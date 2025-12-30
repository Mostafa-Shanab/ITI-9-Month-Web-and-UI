function showAddr(addrObj) {
  let res = `${addrObj.buildingNum} ${addrObj.street}, ${
    addrObj.city
  } city registered in ${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;
  return res;
}

addrObj = { street: "abc st.", buildingNum: 15, city: "xyz" };

console.log(showAddr(addrObj));
