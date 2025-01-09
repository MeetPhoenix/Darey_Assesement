const ProfilePage = require('../pageobjects/ProfilePage');

describe('Profile Creation Feature', () => {
  const validData = {
    name: 'John Doe',
    age: '30',
    gender: 'Male',
    location: 'New York',
    interests: 'Reading, Traveling, Coding',
  };

  const resourcesPath = './test/resources/';

  beforeEach(async () => {
    await ProfilePage.open();
  });

  it('should create a profile successfully with valid inputs', async () => {
    await ProfilePage.fillForm(validData);
    await ProfilePage.uploadFile(`${resourcesPath}sample-pic.jpg`);
    await ProfilePage.submitForm();
    await expect(ProfilePage.successMessage).toBeDisplayed();
    await expect(ProfilePage.successMessage).toHaveText('Profile created successfully!');
  });

  it('should display error messages when required fields are missing', async () => {
    await ProfilePage.submitForm();
    const errors = await ProfilePage.getErrorMessages();
    expect(errors).toContain('Name is required.');
    expect(errors).toContain('Age is required.');
    expect(errors).toContain('Gender is required.');
    expect(errors).toContain('Location is required.');
    expect(errors).toContain('Interests are required.');
    expect(errors).toContain('Profile picture is required.');
  });

  it('should display an error for invalid file upload', async () => {
    await ProfilePage.fillForm(validData);
    await ProfilePage.uploadFile(`${resourcesPath}invalid-file.txt`);
    await ProfilePage.submitForm();
    const errors = await ProfilePage.getErrorMessages();
    expect(errors).toContain('Only .jpg and .png files are allowed.');
  });
});
