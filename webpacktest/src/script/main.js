var _ = require('lodash');
var css = require('../style/style.css');
var Icon = require('../style/images/bg.jpg');
function component() {
    var element = document.createElement('div');

    // Lodash，现在由此脚本导入
    element.innerHTML = _.join(['<div>Hello', 'webpack</div>'], ' ');
    element.classList.add('hello');
    var myIcon = new Image();
    myIcon.src = Icon;
     element.appendChild(myIcon);
    return element;
}
document.getElementsByClassName('img-c-n')[0].append(component());
// document.body.appendChild(component());