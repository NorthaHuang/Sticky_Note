var vm = new Vue({
    el: '#app',

    data: {
        // 色彩名稱 MAP
        colorList: [
            {
                name: 'yellow',
                color: '#ffeb67'
            }, {
                name: 'green',
                color: '#cbe196'
            }, {
                name: 'blue',
                color: '#a5d8d6'
            }, {
                name: 'red',
                color: '#ef898c'
            }, {
                name: 'pink',
                color: '#f100a3'
            }
        ],

        // 便利貼
        note: [
            {
                text: '生日快樂',        // 內容
                color: 'yellow',        // 顏色
                pos: { x: 10, y: 10 }     // 座標(拖曳用)
            }, {
                text: '放假',
                color: 'red',
                pos: { x: 300, y: 300 }
            }
        ],

        nowId: -1,
        mousePos: { x: 0, y: 0 }
    },

    methods: {
        // 背景顏色
        noteCss(n) {
            return {
                fontSize: 240 / n.text.length - 10 + 'px',
                backgroundColor: this.colorList.find(temp => temp.name === n.color).color,
                top: n.pos.y + 'px',
                left: n.pos.x + 'px'
            }
        },

        selectId(idx){
            nowId = idx
        }
    }
})

window.onmousemove = function(e) {
    // console.log(e)
    // if(vm.nowId != -1){
        vm.mousePos.x = e.pageX
        vm.mousePos.y = e.pageY
    // }
}

window.onmouseup = function() {
    vm.nowId = -1
}