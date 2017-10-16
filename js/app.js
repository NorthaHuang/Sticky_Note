// Initialize Firebase
var config = {
    apiKey: "AIzaSyD9sbzcZMQfbtDaZw5epcrZGflP26VPecE",
    authDomain: "stickynote-a760c.firebaseapp.com",
    databaseURL: "https://stickynote-a760c.firebaseio.com",
    projectId: "stickynote-a760c",
    storageBucket: "stickynote-a760c.appspot.com",
    messagingSenderId: "923763380313"
}
firebase.initializeApp(config)

var fireNoteRef = firebase.database().ref('note')
fireNoteRef.on('value', function(snapshot){
    vm.note = snapshot.val()
})

var vm = new Vue({
    el: '#app',

    data: {
        // 色票 MAP
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

        // 便利貼資料容器
        note: [],

        nowId: -1,
        mousePos: { x: 0, y: 0 },
        startMousePos: { x: 0, y: 0 }
    },

    // 監聽
    watch: {
        mousePos() {
            var nowNote = this.note[this.nowId]

            nowNote.pos.x = this.mousePos.x - this.startMousePos.x
            nowNote.pos.y = this.mousePos.y - this.startMousePos.y

            fireNoteRef.child(this.nowId).set(nowNote)
        }
    },

    methods: {
        // 背景顏色
        noteCss(n) {
            var fzTemp = 240 / n.text.length - 10

            fzTemp = fzTemp > 20 ? fzTemp : 20

            return {
                fontSize: fzTemp + 'px',
                backgroundColor: this.colorList.find(temp => temp.name === n.color).color,
                top: n.pos.y + 'px',
                left: n.pos.x + 'px'
            }
        },

        getColor(name) {
            return this.colorList.find(temp => temp.name === name)
        },

        selectId(e, idx){
            this.nowId = idx
            var isBlock = e.srcElement.classList.contains('block')
            var isBtn = e.srcElement.classList.contains('btn')

            if(!isBlock && !isBtn){
                this.startMousePos = {
                    x: e.offsetX,
                    y: e.offsetY
                }
            }else{
                this.nowId = -1
            }
        }, 

        addNote() {
            fireNoteRef.push({
                text: '文字',
                color: 'yellow',
                pos: { 
                    x: Math.random() * 200, 
                    y: Math.random() * 200
                }
            })
        },

        deleteNote(idx){
            fireNoteRef.child(idx).remove()
        },

        setText(idx) {
            var text = prompt('請輸入新的文字：', this.note[idx].text)

            if(text) this.note[idx].text = text

            fireNoteRef.child(idx).set(this.note[idx])
        },

        setColor(idx, colorName) {
            this.note[idx].color = colorName

            fireNoteRef.child(idx).set(this.note[idx])
        }
    }
}) /*===== View Model END =====*/

window.onmousemove = function(e) {
    if(vm.nowId !== -1){
        vm.mousePos = {
            x: e.pageX,
            y: e.pageY
        }
    }
}

window.onmouseup = function() {
    vm.nowId = -1
}