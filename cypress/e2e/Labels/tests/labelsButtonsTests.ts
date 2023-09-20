import { checkNoErrorOnThePage } from "../../../support/alertUtils";
import {
  clickCheck,
  buttonClick,
  buttonCheckExists,
} from "../../../support/clickUtils";
import { checkForLoading } from "../../../support/loadingUtils";
import { checkOnCorrectPage } from "../../../support/pageAssertionUtils";
import { setup } from "../../../support/setupUtils";
import {
  BUTTON_TEXT,
  HEADER_TEXT,
  MENU_TEXT,
} from "../utilsAndConstants/labelTestConstants";
import { checkPresenceOfGroupNameInput } from "../utilsAndConstants/labelsFormUtils";

export const LabelsButtonTests = () =>
  describe("Label Buttons Tests", () => {
    before(() => {
      setup();
    });

    it("Labels Buttons: Validate that New and Cancel buttons work anddon't fail to load the page", () => {
      buttonClick(BUTTON_TEXT.NEW);
      checkOnCorrectPage({ headerText: HEADER_TEXT.CREATE_LABEL });
      checkPresenceOfGroupNameInput({ isPresent: false });

      cy.log("~~~ Clicking Cancel button");
      buttonClick(BUTTON_TEXT.CANCEL);
      buttonCheckExists(BUTTON_TEXT.NEW);
      checkOnCorrectPage({
        headerText: HEADER_TEXT.LABELS,
        notRightPageText: [HEADER_TEXT.CREATE_LABEL, HEADER_TEXT.UPDATE_LABEL],
        notRightPageButton: BUTTON_TEXT.CANCEL,
      });
    });

    it("Labels Buttons: Validate that New (in group) and Cancel buttons work anddon't fail to load the page", () => {
      buttonClick(BUTTON_TEXT.NEW_GROUPED);
      checkOnCorrectPage({ headerText: HEADER_TEXT.CREATE_LABEL });
      checkPresenceOfGroupNameInput({ isPresent: true });

      cy.log("~~~ Clicking Cancel button");
      buttonClick(BUTTON_TEXT.CANCEL);
      buttonCheckExists(BUTTON_TEXT.NEW);
      checkOnCorrectPage({
        headerText: HEADER_TEXT.LABELS,
        notRightPageText: [HEADER_TEXT.CREATE_LABEL, HEADER_TEXT.UPDATE_LABEL],
        notRightPageButton: BUTTON_TEXT.CANCEL,
      });
    });
  });