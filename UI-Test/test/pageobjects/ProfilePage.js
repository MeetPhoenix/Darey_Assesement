class ProfilePage {
    get inputName() { return $('#name'); }
    get inputAge() { return $('#age'); }
    get selectGender() { return $('#gender'); }
    get inputLocation() { return $('#location'); }
    get inputInterests() { return $('#interests'); }
    get inputProfilePicture() { return $('#profilePicture'); }
    get btnSubmit() { return $('button=Create Profile'); }
    get successMessage() { return $('.alert-success'); }
    get errorMessages() { return $$('div.invalid-feedback'); }
  
    async open() {
      await browser.url('http://localhost:3000');
    }
  
    async fillForm({ name, age, gender, location, interests }) {
      await this.inputName.setValue(name);
      await this.inputAge.setValue(age);
      await this.selectGender.selectByVisibleText(gender);
      await this.inputLocation.setValue(location);
      await this.inputInterests.setValue(interests);
    }
  
    async uploadFile(filePath) {
      const remoteFilePath = await browser.uploadFile(filePath);
      await this.inputProfilePicture.setValue(remoteFilePath);
    }
  
    async submitForm() {
      await this.btnSubmit.click();
    }
  
    async getErrorMessages() {
      return Promise.all(this.errorMessages.map(async (el) => el.getText()));
    }
  }
  
  module.exports = new ProfilePage();
  