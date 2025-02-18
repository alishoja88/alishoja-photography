import CustomImage from "@/component/image/customImage";
import alipro from "../../../image/profile/profile02.JPEG";

function Profile() {
  return (
    <div className="w-full md:w-[400px] relative">
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <CustomImage
          src={alipro}
          alt="Profile Picture"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

    </div>
  );
}

export default Profile;