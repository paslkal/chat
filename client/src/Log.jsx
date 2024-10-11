import { useState } from "react";
import { Link } from "react-router-dom";

const FIELDS = {
  USERNAME: "username",
  ROOM: "room",
};

function Log() {
  const { USERNAME, ROOM } = FIELDS;
  const [values, setValues] = useState({
    [USERNAME]: "",
    [ROOM]: "",
  });

  const handleChange = ({
    target: { value, name },
  }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some(value => !value)

    if (isDisabled) e.preventDefault()
  }

  return (
    <>
      <form action=''>
        <input
          type='text'
          name='username'
          placeholder='Type username'
          value={values[USERNAME]}
          onChange={handleChange}
          autoComplete='off'
          required
        />
        <input
          type='text'
          name='room'
          placeholder='Type room'
          value={values[ROOM]}
          onChange={handleChange}
          autoComplete='off'
          required
        />

        <Link
          to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`}
          onClick={handleClick}
        >
          <button type='submit'>
            Sign In
          </button>
        </Link>
      </form>
    </>
  );
}

export default Log;
