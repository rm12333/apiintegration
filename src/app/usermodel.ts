import { required } from "@rxweb/reactive-form-validators";

export class User {
  @required({ message: "First Name (Furigana) is required" })
  firstNameFurigana!: string;

  @required({ message: "First Name (Kanji) is required" })
  firstNameKanji!: string;

  @required({ message: "Last Name (Furigana) is required" })
  lastNameFurigana!: string;

  @required({ message: "Last Name (Kanji) is required" })
  lastNameKanji!: string;

  @required({ message: "Profile Image is required" })
  profileImage!: string;
}
