import ReactLoading from 'react-loading';
export default function LoadingSpinner() {
  return (
    <div className="h-screen flex items-center">
      <ReactLoading
        type={'spin'}
        color={'white'}
        height={'100px'}
        width={'100px'}
      />
    </div>
  );
}
