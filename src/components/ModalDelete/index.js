import axios from 'axios';

function ModalDelete(props) {
    //Delete one list
    const handleDeleteList = (e) => {
        axios
            .delete(`http://localhost:9000/api/${props.target}/deleteOne`, {
                params: {
                    _id: props.idDelete,
                },
            })
            .then(() => {
                props.render();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title" id="exampleModalLabel">
                            Xóa {props.message} ?
                        </h2>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Hành động này không thể khôi phục.Bạn chắc chắn muốn Xóa {props.message} này?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary cancel" data-dismiss="modal">
                            Hủy
                        </button>
                        <button type="button" className="btn btn-danger delete" onClick={handleDeleteList}>
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDelete;
