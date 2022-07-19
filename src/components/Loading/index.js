function Loading() {
    return (
        <div id={'loading'} style={{ color: 'red', margin: 'auto', fontSize: '20px' }}>
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export default Loading;
