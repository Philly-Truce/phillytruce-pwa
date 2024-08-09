import ProfileFrameIcon from "@/assets/icons/profile-frame-icon";

export default function Profile() {
  return (
    <div id="profile-page" className="flex flex-col w-full pt-[84px] px-4">
      <div className="flex justify-center my-5">
        <ProfileFrameIcon />
      </div>
      <div>
        <form action="">
          <fieldset className="border-2 border-accent2 rounded">
            <legend className="text-xs mx-3 px-1">First Name</legend>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First name"
              className="p-4 w-full"
            />
          </fieldset>
          <fieldset className="border-2 border-accent2 rounded">
            <legend className="text-xs mx-3 px-1">Last Name</legend>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              className="p-4 w-full"
            />
          </fieldset>
          <fieldset className="border-2 border-accent2 rounded">
            <legend className="text-xs mx-3 px-1">Phone Number</legend>
            <input
              type="number"
              id="phone_number"
              name="phone_number"
              placeholder="Phone Number"
              className="p-4 w-full"
            />
          </fieldset>
          <fieldset className="border-2 border-accent2 rounded">
            <legend className="text-xs mx-3 px-1">Email</legend>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="p-4 w-full"
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
}
