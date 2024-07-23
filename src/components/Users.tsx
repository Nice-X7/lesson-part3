import React from 'react';

type UserProps = {
  users: {
    id: number;
    name: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lng: string;
        lat: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }[];
};

export const Users: React.FC<UserProps> = ({ users }) => {
  return (
    <div className="user">
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};