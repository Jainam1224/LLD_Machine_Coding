import NestedComments from "../components/NestedComments";
import "./App.css";
import commentsData from "../data/comments.json";

function App() {
  return (
    <div>
      <h1>Nested Comment System</h1>
      <NestedComments
        comments={commentsData}
        onSubmit={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        // onUpvote={() => {}}
        // onDownvote={() => {}}
      />
    </div>
  );
}

export default App;
