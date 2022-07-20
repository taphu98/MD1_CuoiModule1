class Category {
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }
}
class Song {
    constructor(name, lyrics, category) {
        this.name = name
        this.lyrics = lyrics
        this.category = category
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }

    getLyrics() {
        return this.lyrics
    }

    setLyrics(lyrics) {
        this.lyrics = lyrics
    }

    getCategory() {
        return this.category
    }

    setCategory(category) {
        this.category = category
    }
}
class Depot{
    constructor() {
        this.categoryList = []
        this.songList = []
    }
    add(name) {
        if (name.trim() === '') {
            document.getElementById('chuThich').innerHTML = ' <span style="color: red">The name is not required! Please try again!</span>'
        } else {
            this.categoryList.push(new Category(name))
        }
        this.show()
    }
    edit(index) {
        let name = prompt('Category: ', this.categoryList[index].name)
        if (name.trim() === '') {
            alert('Không được để trống')
        } else {
            this.categoryList[index].name = name
        }
        this.show()
    }
    delete(index) {
        this.categoryList.splice(index, 1)
        this.show()
    }
    show() {
        let div = document.querySelector('#category')
        let select = document.querySelector('#selectCategory')
        div.replaceChildren()
        select.replaceChildren()

        let table = document.createElement('table')

        table.innerHTML = '<tr><td>STT</td><td>NAME</td><td>EDIT</td><td>DELETE </td></tr>'

        this.categoryList.forEach((category, i) => {
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            td.append(i + 1)
            tr.append(td)

            let tdDraw = document.createElement('td')
            tdDraw.append(category.name)
            tr.append(tdDraw)

            let editButton = document.createElement('button')
            editButton.innerHTML = 'Edit'
            editButton.onclick = () => {
                this.edit(i)
            }
            let tdEdit = document.createElement('td')
            tdEdit.append(editButton)
            tr.append(tdEdit)

            let deleteButton = document.createElement('button')
            deleteButton.innerHTML = 'Delete'
            deleteButton.onclick = () => {
                this.delete(i)
            }
            let tdDelete = document.createElement('td')
            tdDelete.append(deleteButton)
            tr.append(tdDelete)

            table.append(tr)
            div.append(table)

            let opt = document.createElement('option')
            opt.innerHTML = category.name
            select.append(opt)
        })
    }

    addSong(nameSong, lyrics) {
        let cate = this.categoryList.find(cate => cate.name === document.querySelector('select').value)
        this.songList.push(new Song(nameSong, lyrics, cate.name))
        this.showSongList()
    }

    deleteSong(index) {
        this.songList.splice(index, 1)
        this.showSongList()
    }

    showSongList() {
        let div = document.querySelector('#songList')
        div.replaceChildren()

        let table = document.createElement('table')

        table.innerHTML = '<tr><td>ID</td><td>NAME</td><td>CATEGORY</td>'

        this.songList.forEach((song, i) => {
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            td.append(i + 1)
            tr.append(td)

            let tdName = document.createElement('td')
            tdName.append(song.name)
            tr.append(tdName)

            let tdCate = document.createElement('td')
            tdCate.append(song.category)
            tr.append(tdCate)
            table.append(tr)
        })

        div.append(table)
    }

}let depot = new Depot()

depot.show()

depot.add('Nhạc Đỏ')
depot.add('Nhạc Vàng')
depot.add('Nhạc Trẻ')
depot.add('Nhạc Rock')

depot.showSongList()

document.querySelector("button").onclick = () => {
    depot.add(document.querySelector('#categoryCreate').value)
}

document.querySelector('#createSong').onclick = () => {
    let name = document.querySelector('#nameSong').value
    let lyrics = document.querySelector('#lyrics').value
    depot.addSong(name, lyrics)
}