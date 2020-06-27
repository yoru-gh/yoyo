// highlight.js 扩展添加行号
class HljsSetLineNumber {
    constructor(options = 'hljs') {
        this.styleFormat = (str, cn = options) => {
            return str.replace(/\{(\d+)\}/g, cn)
        }
        //创建行号样式，使用伪类遮挡 list-style 数字后面的一点
        this.createLineNumbersStyle = () => {
            let lineNumbersStyle = [
                '.{0} ol {',
                    'list-style: decimal;',
                    'margin: 0px 0px 0 40px;',
                    'padding: 0px;',
                '}',
                '.{0} ol li {',
                    'position: relative;',
                    'padding: 2px;',
                '}',
                '.{0} ol li::before {', // 设置伪类样式目的时为了遮挡有序列表自带的数字后面的一点
                    'content: "";',
                    'position: absolute;',
                    'top: 12px;',
                    'left: -18px;',
                    'width: 8px;',
                    'height: 8px;',
                    'background-color: ' + getComputedStyle(document.getElementsByClassName('hljs')[0])['backgroundColor'],
                '}',
            ]
            let istyle = document.createElement('style')
            istyle.setAttribute('id', 'hljsStyle')
            istyle.type = 'text/css'
            istyle.innerHTML = this.styleFormat(lineNumbersStyle.join(''))
            if(document.getElementById('hljsStyle')) {
                document.getElementById('hljsStyle').innerHTML = this.styleFormat(lineNumbersStyle.join(''))
            } else {
                document.getElementsByTagName('head')[0].appendChild(istyle)
            }
        }
        //初始化代码行号
        this.init = () => {
            let code = document.querySelectorAll('code')
            code.forEach((item) => {
                // 根据页面布局，code 标签内是缩进了 12 个空格的代码，输出时要去除不必要的空格
                // \n 换行符长度是 1, 删除 code 标签内自动生成的首尾两个换行符，-9 原因是</code>前有8个空格和一个换行符
                let codeStr = item.innerHTML.substring(1, item.innerHTML.length-9)
                codeStr = '<ol><li>' + codeStr.replace(/\n/g, '\n</li><li>') + '\n</li></ol>' // 插入用于显示行号的 ol
                codeStr = codeStr.replace(/<li> {12}/g, '<li>') // 将页面缩进的前 12 个空格去掉
                item.innerHTML = codeStr
            })
        }
    }
}
export default HljsSetLineNumber