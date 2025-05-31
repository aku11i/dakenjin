import type { Session } from "./session";

export class SessionAnalyzer {
  private readonly session: Session;

  constructor(session: Session) {
    this.session = session;
  }

  getDuration(): number {
    const sessionLog = this.session.inputLog;
    const startTime = sessionLog.startTime
      ? new Date(sessionLog.startTime)
      : null;

    if (!startTime) {
      return 0;
    }

    const endTime =
      this.session.isCompleted() && sessionLog.endTime
        ? new Date(sessionLog.endTime)
        : new Date();

    const elapsedTime = (endTime.getTime() - startTime.getTime()) / 1000;
    return Math.round(elapsedTime * 10) / 10;
  }

  getTotalKeystrokes(): number {
    let total = 0;
    this.session.sentences.forEach((sentence) => {
      sentence.characters.forEach((character) => {
        total += character.inputLog.keyInputs.length;
      });
    });
    return total;
  }

  getSuccessfulKeystrokes(): number {
    let successful = 0;
    this.session.sentences.forEach((sentence) => {
      sentence.characters.forEach((character) => {
        successful += character.inputLog.keyInputs.filter(
          (input) => input.success,
        ).length;
      });
    });
    return successful;
  }

  getFailedKeystrokes(): number {
    let failed = 0;
    this.session.sentences.forEach((sentence) => {
      sentence.characters.forEach((character) => {
        failed += character.inputLog.keyInputs.filter(
          (input) => !input.success,
        ).length;
      });
    });
    return failed;
  }

  calcAccuracy(): number {
    const total = this.getTotalKeystrokes();
    if (total === 0) {
      return 0;
    }
    const successful = this.getSuccessfulKeystrokes();
    const accuracy = (successful / total) * 100;
    return Math.round(accuracy * 10) / 10;
  }

  calcKps(): number {
    const duration = this.getDuration();
    if (duration === 0) {
      return 0;
    }
    const successful = this.getSuccessfulKeystrokes();
    const kps = successful / duration;
    return Math.round(kps * 10) / 10;
  }

  calcCpm(): number {
    const duration = this.getDuration();
    if (duration === 0) {
      return 0;
    }
    const successful = this.getSuccessfulKeystrokes();
    const cpm = successful / (duration / 60);
    return Math.round(cpm * 10) / 10;
  }

  isActive(): boolean {
    const sessionLog = this.session.inputLog;
    return sessionLog.startTime !== null && !this.session.isCompleted();
  }
}
