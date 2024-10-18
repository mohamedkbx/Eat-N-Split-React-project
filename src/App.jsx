import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [friendList, setFriendList] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriendTap() {
    setIsOpen((isOpen) => !isOpen);
  }

  function handleAddFriend(newFriend) {
    setFriendList((friends) => [...friends, newFriend]);
  }
  function handleSelectedFriend(friend) {
    setSelectedFriend((selectedFriend) => {
      return selectedFriend?.id === friend.id ? null : friend;
    });
    setIsOpen(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          onSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
          friendList={friendList}
        />
        {isOpen && <AddFriendForm onAddFriend={handleAddFriend} />}
        <Button onClick={handleAddFriendTap}>{isOpen ? "Close" : "Add Friend"}</Button>
      </div>
      {selectedFriend && <FormSplitBill friend={selectedFriend} />}
    </div>
  );
}

function FriendList({ friendList, onSelectedFriend, selectedFriend }) {
  return (
    <>
      <ul className="">
        {friendList.map((friend) => {
          return (
            <Friend
              onSelectedFriend={onSelectedFriend}
              friend={friend}
              key={friend.id}
              selectedFriend={selectedFriend}
            />
          );
        })}
      </ul>
    </>
  );
}

function Friend({ friend, onSelectedFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => onSelectedFriend(friend)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleFriendName(event) {
    setName(event.target.value);
  }

  function handleFriendImage(event) {
    setImage(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = { id, name, image: `${image}?=${id}`, balance: 0 };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫Friend Name</label>
      <input type="text" value={name} onChange={handleFriendName} />
      <label>Image URL</label>
      <input type="text" value={image} onChange={handleFriendImage} />
      <Button>Add </Button>
    </form>
  );
}

function FormSplitBill({ friend }) {
  return (
    <form className="form-split-bill">
      <h2> Split a bill with {friend.name}</h2>
      <label>Bill Value</label>
      <input type="text" />
      <label>Your expense</label>
      <input type="text" />
      <label>👫{friend.name} expense </label>
      <input type="text" disabled />
      <label>Who is paying the bill ?</label>
      <select>
        <option value="you">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Add </Button>
    </form>
  );
}
