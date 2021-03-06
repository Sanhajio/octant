// Copyright (c) 2019 the Octant contributors. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
//

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  Action,
  SummaryItem,
  SummaryView,
  View,
} from 'src/app/shared/models/content';
import { FormGroup } from '@angular/forms';
import { ActionService } from '../../../../modules/overview/services/action/action.service';

@Component({
  selector: 'app-view-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnChanges {
  private v: SummaryView;

  @Input() set view(v: View) {
    this.v = v as SummaryView;
  }
  get view() {
    return this.v;
  }

  title: View[];
  isLoading = false;

  currentAction: Action;

  constructor(private actionService: ActionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.view.currentValue) {
      const view: SummaryView = changes.view.currentValue;
      this.title = view.metadata.title;
    }
  }

  identifyItem(index: number, item: SummaryItem): string {
    return `${index}-${item.header}`;
  }

  onPortLoad(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setAction(action: Action) {
    this.currentAction = action;
  }

  onActionSubmit(formGroup: FormGroup) {
    if (formGroup && formGroup.value) {
      this.actionService.perform(formGroup.value);
      this.currentAction = undefined;
    }
  }

  onActionCancel() {
    this.currentAction = undefined;
  }

  shouldShowFooter(): boolean {
    if (this.v && this.v.config.actions) {
      if (!this.currentAction && this.v.config.actions.length > 0) {
        return true;
      }
    }

    return false;
  }
}
