/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city_input = document.getElementById("aqi-city-input");
var value_input = document.getElementById("aqi-value-input");
var output_table = document.getElementById("aqi_table");
var cityReg = /^[a-zA-Z\u4e00-\u9fa5a]+$/; 
var tbHeader = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
var valueReg = /^\d+$/;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = city_input.value.trim();
	var value = value_input.value.trim();

	if(!cityReg.test(city) || !valueReg.test(value)){
		alert("wrong input value");
		return;
	}

	aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var tbcontent = tbHeader;

	for(var city in aqiData){
		tbcontent += "<tr><td>";
		tbcontent += city;
		tbcontent += "</td><td>";
		tbcontent += aqiData[city]
		tbcontent += "</td><td><button data-city='"+city+"'>删除</button></td>";
	}

    document.getElementById("aqi-table").innerHTML = tbcontent;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete aqiData[city];
  console.log(city);
  renderAqiList();
}

function init() {	

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  //document.getElementById("add-btn").onclick = addBtnHandle();
  document.getElementById("add-btn").addEventListener("click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById("aqi-table").addEventListener("click", function(event){
  	if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
  })

}

init();
