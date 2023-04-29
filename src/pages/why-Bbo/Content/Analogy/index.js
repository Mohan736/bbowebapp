import Parser from 'html-react-parser';
function Analogy(props){
  return <>
    <div className="row mb-5">
      <div className="col-md-12 text-center">
        <h2 className="section__heading">
          {props.analogy.title ? Parser(props.analogy.title) : ''}
        </h2>
        <div className="row">
          <div className="col-lg-10 mx-auto">
          {props.analogy.description ? <p>{Parser(props.analogy.description)}</p> : <p></p>}
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Analogy;