import Header from '~/components/Layout/components/Header';

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div id={'content'}>{children}</div>
        </div>
    );
}

export default HeaderOnly;
