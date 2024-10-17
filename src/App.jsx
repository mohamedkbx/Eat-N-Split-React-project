import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <AddFriendForm />
        <Button>Add Friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;
  return (
    <>
      <ul className="">
        {friends.map((friend) => {
          return <Friend friend={friend} key={friend.id} />;
        })}
      </ul>
    </>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <div>
        <h2>{friend.name}</h2>
        {friend.balance < 0 && (
          <p style={{ color: "red" }}>
            {" "}
            you owe {friend.name} {Math.abs(friend.balance)}$
          </p>
        )}
        {friend.balance > 0 && (
          <p style={{ color: "green" }}>
            {" "}
            {friend.name} owen you {Math.abs(friend.balance)}$
          </p>
        )}
        {friend.balance === 0 && <p> you and your friend equals</p>}
      </div>
      <Button>Submit</Button>
    </li>
  );
}
function Button({ children }) {
  return <button className="button">{children}</button>;
}

function AddFriendForm() {
  return (
    <form className="form-add-friend">
      <label>👫Friend Name</label>
      <input type="text" />
      <label>Image URL</label>
      <input type="text" />
      <Button>Add </Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2> Split a bill with </h2>
      <label>Bill Value</label>
      <input type="text" />
      <label>Your expense</label>
      <input type="text" />
      <label>👫X expense </label>
      <input type="text" disabled />
      <label>Who is paying the bill ?</label>
      <select>
        <option value="you">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Add </Button>
    </form>
  );
}
