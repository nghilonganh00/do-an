import Image from "next/image";

export default function SettingPage() {
  return (
    <div className="w-full border border-gray-100 rounded-sm">
      <div className="px-6 py-4">
        <h3 className="text-label-3 uppercase">Account Setting</h3>
      </div>

      <div className="p-6">
        <div className="flex gap-6">
          {/* <Image /> */}
          <Image
            src={"/assets/images/avatar_1.png"}
            style={{ alignSelf: "flex-start" }}
            width={176}
            height={176}
            alt="avatar"
          />

          <div className="flex-1">
            <div className="flex-1 grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <label className="text-body-small-400">Display name</label>
                <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-6">
                <label className="text-body-small-400">Username</label>
                <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-6">
                <label className="text-body-small-400">Full Name</label>
                <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-6">
                <label className="text-body-small-400">Email</label>
                <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-6">
                <label className="text-body-small-400">Secondary Email</label>
                <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-6">
                <label className="text-body-small-400">Phone Number</label>
                <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>

              <div className="col-span-12">
                <label className="text-body-small-400">Address</label>
                <input className="w-full h-11 mt-2 border border-gray-100 rounded-xs p-2" />
              </div>
            </div>
            <button className="h-12 flex items-center justify-center gap-2 px-6 mt-6 bg-primary-500 rounded-xs">
              <span className="text-heading-7 text-gray">SAVE CHANGES</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
