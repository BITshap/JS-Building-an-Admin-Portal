
async function getBooks() {
    let response = await fetch('http://localhost:3001/listBooks')
    let responseJSON = await response.json()

    let bigDiv = document.getElementById('root')
    let unList = document.createElement('ul')

    responseJSON.forEach(book => {
        console.log('Book ID: ' + book.id + ', Book title: '+  book.title) 

        let liList = document.createElement('li')
        let input = document.createElement('input')
        let button1 = document.createElement('button')
        let button2 = document.createElement('button')

        liList.textContent = book.title
        liList.id = book.id

        input.setAttribute('type', 'text')
        input.setAttribute('value', book.quantity)

        button1.textContent = 'Update'
        button1.setAttribute('class', 'btn btn-primary')
        button1.setAttribute('type', 'submit')
        button1.addEventListener('click', () => {
            console.log('Book id on save is: ' + book.id)
            fetch('http://localhost:3001/updateBook', {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify ({
                    id: book.id,
                    quantity: input.value
                })
            })
        })
        button2.textContent = 'Remove'
        button2.setAttribute('class', 'btn btn-danger')
        button2.setAttribute('type', 'delete')
        button2.addEventListener('click', () => {
            fetch('http://localhost:3001/removeBook/{bookId}', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify ({
                    id: book.id,
                    quantity: book.quantity - 1
                })
            })

        })

        unList.appendChild(liList)
        unList.append(input)
        unList.append(button1)
        unList.append(button2)
        })
        bigDiv.appendChild(unList)
}

getBooks()
