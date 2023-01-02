import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import { deleteItem } from '../store/Actions'
import { deleteData } from '../utils/fetchData'
import { useRouter } from 'next/router'


const Modal = () => {
    const { state, dispatch } = useContext(DataContext)
    const { modal, auth } = state

    const router = useRouter()

    const deleteUser = (item) => {
        dispatch(deleteItem(item.data, item.id, item.type))

        deleteData(`user/${item.id}`, auth.token)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            })
    }

    const deleteCategories = (item) => {
        deleteData(`categories/${item.id}`, auth.token)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                dispatch(deleteItem(item.data, item.id, item.type))
                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            })
    }

    const deleteProduct = (item) => {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })
        deleteData(`product/${item.id}`, auth.token)
            .then(res => {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                return router.push('/')
            })
    }

    const handleSubmit = () => {
        if (modal.length !== 0) {
            for (const item of modal) {
                if (item.type === 'ADD_CART') {
                    dispatch(deleteItem(item.data, item.id, item.type))
                }

                if (item.type === 'ADD_USERS') deleteUser(item)

                if (item.type === 'ADD_CATEGORIES') deleteCategories(item)

                if (item.type === 'DELETE_PRODUCT') deleteProduct(item)

                dispatch({ type: 'ADD_MODAL', payload: [] })
            }
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                                {modal.length !== 0 && modal[0].title}
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body"> Do you want to delete this item?</div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={handleSubmit}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal