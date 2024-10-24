type ModalProps = {
    children: React.ReactNode;
    isOpen?: boolean;
}

function Modal({children, isOpen = true}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                {children}
            </div>
        </div>
    )
}

export default Modal;